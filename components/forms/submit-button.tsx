import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  formAction?: (formData: FormData) => Promise<void>;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, isLoading, formAction }) => {
  const formContext = useFormContext ? useFormContext() : null;
  const isValid = formContext ? formContext.formState.isValid : true;

  return (
    <button
      type="submit"
      disabled={!isValid || isLoading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      formAction={formAction}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
