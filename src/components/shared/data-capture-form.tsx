'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface DataCaptureFormProps {
  title: string;
  description: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

export function DataCaptureForm({ title, description, fields, onSubmit }: DataCaptureFormProps) {
  const methods = useForm();

  const handleFormSubmit = (data: Record<string, any>) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  {...methods.register(field.name, { required: true })}
                />
              </div>
            ))}
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
