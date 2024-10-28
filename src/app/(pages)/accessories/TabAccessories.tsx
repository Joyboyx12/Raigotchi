import ItemAccessorie from "@/app/(pages)/accessories/ItemAccessorie";
import imgs_decor from "@/assets/accessories/Decor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function TabAccessories() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value="account"
          className="bg-no-repeat"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/DecorationsTab_Active.png')`,
          }}
        ></TabsTrigger>
        <TabsTrigger
          value="password"
          className="bg-no-repeat"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/AccessoriesTab_Active.png')`,
          }}
        ></TabsTrigger>
        <TabsTrigger
          value="fas"
          className="bg-no-repeat"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/BackgroundTab_Active.png')`,
          }}
        ></TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div
          className="h-[280px] bg-no-repeat px-6 py-7"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Shop_Decorations_Menu.png')`,
          }}
        >
                            <ItemAccessorie img={imgs_decor.glass} typeBox="1"/>

        </div>
      </TabsContent>
      <TabsContent value="password">
        <div
          className="h-[280px] bg-no-repeat  px-6 py-7"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Shop_Accessories_Menu.png')`,
          }}
        >
                  <ItemAccessorie img={imgs_decor.glass} typeBox="2"/>

        </div>
      </TabsContent>
      <TabsContent value="fas">
        <div
          className="h-[280px] bg-no-repeat  px-6 py-7"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Shop_Backgrounds_Menu.png')`,
          }}
        >
                           <ItemAccessorie img={imgs_decor.glass} typeBox="3"/>

        </div>
      </TabsContent>
    </Tabs>
  );
}
