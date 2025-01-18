import React, { useState } from "react";
import styles from "./styles.module.scss";
import TitlePage from "@/shared/components/titlePage/TitlePage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Account, mockAccounts } from "@/data/mockAccountData";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTable from "@/shared/components/accountTable/AccountTable";

const AccountPage = () => {
    const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  
    const handleStatusToggle = (account: Account) => {
      if (account.isActive) {
        setSelectedAccount(account);
        setShowDeactivateModal(true);
      } else {
        updateAccountStatus(account.id, true);
      }
    };

    const updateAccountStatus = (id: string, status: boolean) => {
        setAccounts(accounts.map(acc => 
          acc.id === id ? { ...acc, isActive: status } : acc
        ));
        setShowDeactivateModal(false);
      };
      return (
        <div className={styles["outer-container"]}>
          <TitlePage title={["Account", "Management"]} />
     
          <div className={styles.container}>
        <Tabs defaultValue="listener" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listener">Listener</TabsTrigger>
            <TabsTrigger value="artist">Artist</TabsTrigger>
            <TabsTrigger value="label">Label</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listener">
            <AccountTable  accountType="listener" />
          </TabsContent>
          
          <TabsContent value="artist">
            <AccountTable  accountType="artist" />
          </TabsContent>
          
          <TabsContent value="label">
            <AccountTable  accountType="label" />
          </TabsContent>
        </Tabs>
      </div>
        </div>
      );
};

export default AccountPage;
