import { NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";

const wallet = new BeaconWallet({
  name: "WTZ",
  preferredNetwork: NetworkType.MAINNET,
  colorMode: "dark",
});

const network = {
  type: NetworkType.MAINNET,
};

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

export { wallet, getActiveAccount, requestPermissions, clearActiveAccount };
