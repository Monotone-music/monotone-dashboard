import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "./styles.module.scss";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  getAllAccountByType,
  toggleStatusAccount,
} from "@/service/adminService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import formatMonthYear from "@/util/formatDate";
import { useToast } from "@/hooks/use-toast";

interface AccountTableProps {
  accountType: "listener" | "artist" | "label";
}

const AccountTable: React.FC<AccountTableProps> = ({ accountType }) => {
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [actionType, setActionType] = useState<'activate' | 'deactivate'>('deactivate');
  const { toast } = useToast();
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: (accountId: string) => toggleStatusAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts", accountType] });
      toast({
        title: "Success",
        description: "Account status updated successfully",
        className: styles['toast-success']
      });
      setShowDeactivateModal(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update account status",
      });
    },
  });

  const handleStatusToggle = (account: any) => {
    setSelectedAccount(account);
    setActionType(account.account.status === 'active' ? 'deactivate' : 'activate');
    setShowDeactivateModal(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["accounts", accountType],
    queryFn: () => getAllAccountByType(accountType),
  });

  console.log(data)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <PuffLoader />
        ) : (
          <>
            <TableBody>
              {data.map((account: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    {accountType === "artist"
                      ? account.name
                      : account.displayName}
                  </TableCell>
                  {account.account ? (
                    <TableCell>{account.account.email}</TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  <TableCell>{accountType}</TableCell>
                  <TableCell>{formatMonthYear(account.createdAt)}</TableCell>
                  {account.account ? (
                    <TableCell>{account.account.status}</TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  <TableCell>
                    {account.account ? (
                      <Switch
                        checked={account.account.status === "active"}
                        onCheckedChange={() => handleStatusToggle(account)}
                        disabled={toggleMutation.isPending}
                      />
                    ) : (
                      <TableCell></TableCell>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>

      <Dialog open={showDeactivateModal} onOpenChange={setShowDeactivateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'deactivate' ? 'Deactivate' : 'Activate'} Account
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to {actionType} this account?
            <p className="font-semibold">{selectedAccount?.account?.email}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeactivateModal(false)}
              disabled={toggleMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant={actionType === 'deactivate' ? 'destructive' : 'default'}
              onClick={() => selectedAccount && toggleMutation.mutate(selectedAccount.account._id)}
              disabled={toggleMutation.isPending}
            >
              {toggleMutation.isPending 
                ? `${actionType === 'deactivate' ? 'Deactivating' : 'Activating'}...` 
                : actionType === 'deactivate' ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountTable;
