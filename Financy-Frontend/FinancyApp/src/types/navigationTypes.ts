import Account from "../types/account"

export type RootStackParamList = {
    Drawer: undefined;
    EditAccount: { account: Account };
    Login: undefined;
    Register: undefined;
};

export type DrawerParamList = {
    Financy: undefined;
    'Minhas Contas': undefined;
    'Adicionar Conta': undefined;
  };  