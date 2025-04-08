import React from "react";
import { RetailerCreateDTO } from "@/dtos/retailer/request/Create";
import { Form } from "@/components/Form/Component";
import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { AppLayout } from "@/components/AppLayout/Component";

const retailerService = ServiceFacadeProvider.getLocal().getRetailerService();

export default function RetailerFormPage() {
  const handleSubmit = async (data: RetailerCreateDTO) => {
    await retailerService.create(data);
  };

  return (
    <AppLayout>
      <Form data={new RetailerCreateDTO()} onSubmit={handleSubmit} />
    </AppLayout>
  );
}
