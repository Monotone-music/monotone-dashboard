import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Account } from "@/data/mockAccountData";
import { getAllAccountByType } from "@/service/adminService";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import formatMonthYear from "@/util/formatDate";

interface AccountTableProps {
  accountType: "listener" | "artist" | "label";
}

const AccountTable: React.FC<AccountTableProps> = ({ accountType }) => {
  const [accounts, setAccounts] = useState<Account[]>();
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

  const { data, isLoading } = useQuery({
    queryKey: ["accounts", accountType],
    queryFn: () => getAllAccountByType(accountType),
  });

//   console.log(data);

  const updateAccountStatus = (id: string, status: boolean) => {
    // setAccounts(
    //   accounts.map((acc) =>
    //     acc.id === id ? { ...acc, isActive: status } : acc
    //   )
    // );
    setShowDeactivateModal(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            {/* <TableHead>Email</TableHead> */}
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            
          </TableRow>
        </TableHeader>
        {isLoading ? <PuffLoader/> : <>
            <TableBody>
          {accountType === "artist"
            ? data.artists.map((account:any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{account.name}</TableCell>
                  {/* <TableCell>{account.email}</TableCell> */}
                  <TableCell>{accountType}</TableCell>
                  <TableCell>{formatMonthYear(account.createdAt)}</TableCell>
                  {/* <TableCell>
                <Switch
                  checked={account.isActive}
                  onCheckedChange={() => handleStatusToggle(account)}
                />
              </TableCell> */}
                </TableRow>
              ))
            : data.map((account:any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{account.displayName}</TableCell>
                  <TableCell>{accountType}</TableCell>
                  <TableCell>{formatMonthYear(account.createdAt)}</TableCell>
                  {/* <TableCell>
                <Switch
                  checked={account.isActive}
                  onCheckedChange={() => handleStatusToggle(account)}
                />
              </TableCell> */}
                </TableRow>
              ))
              }
        </TableBody>
        
        </>}

      
      </Table>

      <Dialog open={showDeactivateModal} onOpenChange={setShowDeactivateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Account</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to deactivate this account?
            <p className="font-semibold">{selectedAccount?.username}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeactivateModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                selectedAccount &&
                updateAccountStatus(selectedAccount.id, false)
              }
            >
              Deactivate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountTable;
