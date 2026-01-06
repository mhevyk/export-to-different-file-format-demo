import { AppButton } from "@/components/AppButton.tsx";
import { AppTable } from "@/components/AppTable.tsx";
import { useDataExport } from "@/hooks/useDataExport.ts";
import { useOrdersTable } from "@/hooks/useOrdersTable.ts";

const App = () => {
  const orderTableOptions = useOrdersTable();

  const { exportAsCSV, exportAsDOCX, exportAsPDF, exportAsXML } = useDataExport(
    {
      data: orderTableOptions.data,
    }
  );

  return (
    <div className="container" style={{ marginTop: "24px" }}>
      <h1>Orders</h1>
      <AppTable options={orderTableOptions} />
      <div className="grid">
        <AppButton onClick={() => exportAsCSV("orders.csv")}>
          Export CSV
        </AppButton>
        <AppButton onClick={() => exportAsDOCX("orders.docx")}>
          Export DOCX
        </AppButton>
        <AppButton onClick={() => exportAsPDF("orders.pdf")}>
          Export PDF
        </AppButton>
        <AppButton onClick={() => exportAsXML("orders.xml")}>
          Export XML
        </AppButton>
      </div>
    </div>
  );
};

export default App;
