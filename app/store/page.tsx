"use client";
import FramerTransition from "@/components/common/FramerTransition";
import ContentLayout from "@/components/layout/ContentLayout";
import { columns, TabledataStructure } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";

const StorePage = () => {
  const [tableData, setTableData] = React.useState<TabledataStructure[]>([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(
          "https://asia-south2-woodland-397213.cloudfunctions.net/retailstore"
        )
        .then((data) => setTableData(data.data));
    })();
  }, []);

  return (
   <FramerTransition>
     <ContentLayout>
      <main className="min-h-screen pb-24">
        <div className="relative w-full mb-20 aspect-[9/2]  xl:aspect-[1902/335]">
          <Image
            src={"/STORE_LOCATOR.png"}
            alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
            quality={100}
            fill
            className="w-full"
            style={{ objectFit: "contain", verticalAlign: "bottom" }}
          />
        </div>
        <DataTable columns={columns} data={tableData} />
      </main>
    </ContentLayout>
   </FramerTransition>
  );
};

export default StorePage;
