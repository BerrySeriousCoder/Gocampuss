import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction } from 'react';

interface JoinGroupDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const JoinGroupDialog: React.FC<JoinGroupDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-purple-dark text-white border-purple-light/30">
        <DialogHeader>
          <DialogTitle className="text-purple-light">Choose Your Counseling Path</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select the group that best suits your needs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button asChild className="bg-purple-primary hover:bg-purple-light text-white hover:text-purple-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300">
            <a href="https://forms.gle/RbCttQrYPpHKsnVG8" target="_blank" rel="noopener noreferrer">Join Paid Group</a>
          </Button>
          <Button asChild variant="outline" className="border-purple-light text-purple-light hover:bg-purple-light hover:text-purple-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300">
            <a href="https://chat.whatsapp.com/DVk8OwBUikbCo4pJczU2NC" target="_blank" rel="noopener noreferrer">Join Free Group</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupDialog;