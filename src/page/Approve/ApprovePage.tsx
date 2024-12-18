import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApproveAudioTab from "./ApproveAudioTab";
import ApproveAdsTab from "./ApproveAdsTab";

const ApprovePage = () => {
  return (
    <div>
      <Tabs defaultValue="audio" className="w-full">
        <div className="h-10 w-full">
          <TabsList className="p-6 fixed w-[calc(100%-160px)] md:w-[calc(100%-200px)] justify-center">
            <TabsTrigger
              value="audio"
              className="flex-1 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300"
            >
              Audio Request
            </TabsTrigger>
            <TabsTrigger
              value="advertisement"
              className="flex-1 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300"
            >
              Advertisement Request
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="audio">
          <ApproveAudioTab />
        </TabsContent>
        <TabsContent value="advertisement">
          <ApproveAdsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprovePage;
