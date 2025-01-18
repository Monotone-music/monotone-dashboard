import styles from "./styles.module.scss";
import TitlePage from "@/shared/components/titlePage/TitlePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTable from "@/shared/components/accountTable/AccountTable";

const AccountPage = () => {

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
