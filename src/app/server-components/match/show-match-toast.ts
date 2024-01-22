import { toast } from "sonner";

export function ShowMatchToast() {
  toast("Its a match ! congratulation", {
    description: "Get it started now",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
}
