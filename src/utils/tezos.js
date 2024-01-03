import { BeaconWallet } from "@taquito/beacon-wallet";
import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito";
import { Tzip12Module } from "@taquito/tzip12";
import { Tzip16Module } from "@taquito/tzip16";

const Tezos = new TezosToolkit(process.env.VUE_APP_TEZOS_RPC_URL);
Tezos.addExtension(new Tzip12Module());
Tezos.addExtension(new Tzip16Module());
Tezos.setPackerProvider(new MichelCodecPacker());

const wallet = new BeaconWallet({
  name: process.env.VUE_APP_TEZOS_DAPP_NAME,
  preferredNetwork: process.env.VUE_APP_TEZOS_NETWORK,
  colorMode: "dark",
});

const network = {
  type: process.env.VUE_APP_TEZOS_NETWORK,
};

Tezos.setWalletProvider(wallet);

const requestPermissions = async () => {
  return wallet.requestPermissions({ network });
};

const getActiveAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();

  // no active account, we need permissions first
  if (!activeAccount) {
    await requestPermissions();
    return getActiveAccount();
  }

  return activeAccount;
};

const clearActiveAccount = async () => {
  return wallet.client.clearActiveAccount();
};

const getWalletContract = async (address) => {
  return Tezos.wallet.at(address);
};

const getContract = async (address) => {
  return Tezos.contract.at(address);
};

export { wallet, getActiveAccount, requestPermissions, clearActiveAccount, getWalletContract, getContract, Tezos };
