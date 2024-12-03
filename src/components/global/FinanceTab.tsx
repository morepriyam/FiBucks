import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { FormFields } from "./FormFields";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/models/financeSchema";
import { useState, useEffect } from "react";

interface FinanceTabProps {
  form: UseFormReturn<FormSchema>;
  fieldName: keyof FormSchema;
  getIcon: (fieldName: string) => JSX.Element | null;
  getSummary: (fieldName: keyof FormSchema, field: any) => string;
  onStateChange: (isEditing: boolean) => void;
  onNext: () => void;
}

export function FinanceTab({
  form,
  fieldName,
  getIcon,
  getSummary,
  onStateChange,
  onNext,
}: FinanceTabProps) {
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Properly type the fields being watched
  const fields = form.watch(fieldName) as FormSchema[typeof fieldName];

  useEffect(() => {
    onStateChange(editingItem !== null || isAdding);
  }, [editingItem, isAdding, onStateChange]);

  const getAddButtonText = (fieldName: keyof FormSchema): string => {
    switch (fieldName) {
      case "creditCards":
        return "Credit Card";
      case "depositoryAccounts":
        return "Depository Account";
      case "investments":
        return "Investment";
      case "loans":
        return "Loan";
      case "realEstate":
        return "Real Estate";
      case "others":
        return "Other Item";
      default:
        return "Item";
    }
  };

  const addField = () => {
    if (isAdding) return;
    setIsAdding(true);
    const currentFields = form.getValues(fieldName) || [];
    form.setValue(fieldName, [...currentFields, {} as any]);
    setEditingItem(currentFields.length);
  };

  const removeField = (index: number) => {
    // Explicitly type currentFields based on FormSchema[fieldName]
    const currentFields = form.getValues(fieldName) as
      | {
          name: string;
          lastFourDigits: string;
          limit: string;
          balance: string;
        }[]
      | { name: string; balance: string }[]
      | { value: string; name: string }[]
      | { name: string; balance: string; interestRate: string }[]
      | { address: string; value: string; mortgage?: string }[]
      | { name: string; value: string }[];

    // Filter the fields to remove the item at the specified index
    const updatedFields = currentFields.filter((_, i) => i !== index);

    // Ensure the filtered array is typed correctly for form.setValue
    form.setValue(fieldName, updatedFields as typeof currentFields);

    // Reset editing state
    setEditingItem(null);
    setIsAdding(false);
  };

  const saveItem = (index: number) => {
    const currentFields = form.getValues(fieldName) || [];
    const currentField = currentFields[index];

    const isValid = Object.entries(currentField).every(([key, value]) => {
      if (fieldName === "realEstate" && key === "mortgage") return true;
      return value !== undefined && value !== "";
    });

    if (!isValid) {
      form.trigger(fieldName as any);
      return;
    }

    setEditingItem(null);
    setIsAdding(false);
  };

  const editItem = (index: number) => {
    setEditingItem(index);
  };

  return (
    <>
      {(fields || []).map((field, index) => {
        const isEditing = editingItem === index;

        if (!isEditing) {
          return (
            <Button
              key={index}
              variant="outline"
              className="mb-2 flex w-full justify-between p-4"
              onClick={() => editItem(index)}
            >
              <div className="flex items-center space-x-2">
                {getIcon(fieldName)}
                <span>{getSummary(fieldName, field)}</span>
              </div>
              <Pencil className="h-4 w-4" />
            </Button>
          );
        }

        return (
          <Card key={index} className="mb-4">
            <CardContent className="pt-6">
              <FormFields form={form} fieldName={fieldName} index={index} />
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => saveItem(index)}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeField(index)}
                >
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <div className="mt-4 flex justify-between">
        <Button
          type="button"
          onClick={addField}
          disabled={isAdding || editingItem !== null}
        >
          Add {getAddButtonText(fieldName)}
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={isAdding || editingItem !== null}
        >
          Next
        </Button>
      </div>
    </>
  );
}
