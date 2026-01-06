
'use client';

import { addDoc, collection, where, query } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { ModulePageLayout } from '@/components/shared/module-page-layout';
import { ModuleKpiGrid, type Kpi } from '@/components/shared/module-kpi-grid';
import { DataCaptureForm } from '@/components/shared/data-capture-form';
import { ModuleDataTable } from '@/components/shared/module-data-table';
import { toast } from '@/hooks/use-toast';
import { createAlert } from '@/lib/operational-engine';
import { useMemo } from 'react';

export default function SupplyChainPage() {
  const firestore = useFirestore();

  const inventoryQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'inventoryItems');
  }, [firestore]);

  const { data, loading, error } = useCollection(inventoryQuery);

  const kpis: Kpi[] = useMemo(() => [
    { title: "Critical Spares On Hand", value: data ? `${data.filter(i => i.isCritical).length}` : '...' },
    { title: "Stockout Risk", value: "Low", isAI: true },
    { title: "Avg. Lead Time", value: "12 days" },
    { title: "Orders in Transit", value: "8" },
  ], [data]);

  const columns = [
    { accessorKey: 'itemName', header: 'Item' },
    { accessorKey: 'quantity', header: 'Quantity' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'reorderPoint', header: 'Reorder At' },
    { accessorKey: 'isCritical', header: 'Critical' },
  ];

  const handleAddItem = (formData: Record<string, any>) => {
    if (!firestore) return;
    
    const docData = {
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      reorderPoint: parseInt(formData.reorderPoint, 10),
      isCritical: formData.isCritical === 'true',
    };

    addDoc(collection(firestore, 'inventoryItems'), docData)
      .then(() => {
        toast({ title: 'Success', description: 'Inventory item added.' });
        if (docData.isCritical && docData.quantity <= docData.reorderPoint) {
           createAlert(firestore, {
            moduleKey: 'supply-chain',
            severity: 'Critical',
            description: `Critical low stock for item: ${docData.itemName}. Quantity: ${docData.quantity}`,
          }).then(() => {
            toast({ title: 'Alert Created', description: 'Critical low stock alert has been triggered.' });
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toast({ title: 'Error', description: 'Could not add item.', variant: 'destructive' });
      });
  };

  return (
    <ModulePageLayout
      title="Smart Supply Chain & Inventory"
      description="Manage inventory, logistics, and supply chain."
    >
      <ModuleKpiGrid kpis={kpis} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <ModuleDataTable
            title="Current Inventory"
            description="Snapshot of key inventory items."
            columns={columns}
            data={data ?? []}
            loading={loading}
            error={error}
          />
        </div>
        <DataCaptureForm
          title="Add Inventory Item"
          description="Manually add a new item to the inventory."
          fields={[
            { name: 'itemName', label: 'Item Name', placeholder: 'e.g., Crusher Bearing' },
            { name: 'quantity', label: 'Quantity', type: 'number', placeholder: 'e.g., 10' },
            { name: 'location', label: 'Location', placeholder: 'e.g., Warehouse A' },
            { name: 'reorderPoint', label: 'Reorder Point', type: 'number', placeholder: 'e.g., 2' },
            { name: 'isCritical', label: 'Is Critical?', placeholder: 'true/false' },
          ]}
          onSubmit={handleAddItem}
        />
      </div>
    </ModulePageLayout>
  );
}
