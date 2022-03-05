import { NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { MichelCodecPacker } from "@taquito/taquito";
import { Tzip12Module } from "@taquito/tzip12";
import { Tzip16Module } from "@taquito/tzip16";

const Tezos = new TezosToolkit("https://crunchy-node.teztools.net");
Tezos.addExtension(new Tzip12Module());
Tezos.addExtension(new Tzip16Module());
Tezos.setPackerProvider(new MichelCodecPacker());

const wallet = new BeaconWallet({
  name: "WTZ",
  preferredNetwork: NetworkType.MAINNET,
  colorMode: "dark",
});

const network = {
  type: NetworkType.MAINNET,
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

export { wallet, getActiveAccount, requestPermissions, clearActiveAccount, getWalletContract };
