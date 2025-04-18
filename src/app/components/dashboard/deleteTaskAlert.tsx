import Alert from "../shared/alert";
import Button from "../shared/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskName: string;
};

const DeleteTaskAlert = ({ isOpen, onClose, onConfirm, taskName }: Props) => {
  return (
    <Alert isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Delete Task</h2>
        <p>
          Are you sure you want to delete &quot;{taskName}&quot;? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      </div>
    </Alert>
  );
};

export default DeleteTaskAlert;
