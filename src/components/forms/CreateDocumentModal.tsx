import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { CreateDocumentRequest } from "@/types";
import { Sparkles, Loader2 } from "lucide-react";

interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDocumentRequest) => Promise<void>;
  loading?: boolean;
}

export const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CreateDocumentRequest>({
    title: "",
    type: "document",
    category: "business",
    prompt: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      title: "",
      type: "document",
      category: "business",
      prompt: "",
    });
    onClose();
  };

  const handleInputChange = (
    field: keyof CreateDocumentRequest,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = formData.title.trim() && formData.prompt.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Document"
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Document Title
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter document title..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Document Type
            </label>
            <Select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            >
              <option value="document">Document</option>
              <option value="slide">Slide</option>
              <option value="spreadsheet">Spreadsheet</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <Select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              <option value="business">Business</option>
              <option value="personal">Personal</option>
              <option value="academic">Academic</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI Generation Prompt
            <span className="inline-flex items-center ml-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
            </span>
          </label>
          <Textarea
            value={formData.prompt}
            onChange={(e) => handleInputChange("prompt", e.target.value)}
            placeholder="Describe what you want the AI to generate..."
            rows={4}
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Be specific about the content, style, and structure you want.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || loading}
            className="min-w-[100px]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Create Document
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
