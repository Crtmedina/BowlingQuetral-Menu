"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type AdminConfirmOptions = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type DialogMode = "confirm" | "success" | "error";

type DialogState = {
  open: boolean;
  mode: DialogMode;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  destructive: boolean;
};

const initialState: DialogState = {
  open: false,
  mode: "success",
  title: "",
  description: "",
  confirmLabel: "Confirmar",
  cancelLabel: "Cancelar",
  destructive: false,
};

type AdminActionDialogContextValue = {
  confirm: (options: AdminConfirmOptions) => Promise<boolean>;
  alertSuccess: (message: string, title?: string) => void;
  alertError: (message: string, title?: string) => void;
};

const AdminActionDialogContext = createContext<AdminActionDialogContextValue | null>(null);

export function useAdminActionDialog(): AdminActionDialogContextValue {
  const ctx = useContext(AdminActionDialogContext);
  if (!ctx) {
    throw new Error("useAdminActionDialog debe usarse dentro de AdminActionDialogProvider");
  }
  return ctx;
}

export function AdminActionDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>(initialState);
  const confirmResolveRef = useRef<((value: boolean) => void) | null>(null);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    confirmResolveRef.current = null;
  }, []);

  const confirm = useCallback((options: AdminConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      confirmResolveRef.current = resolve;
      setState({
        open: true,
        mode: "confirm",
        title: options.title,
        description: options.description,
        confirmLabel: options.confirmLabel ?? "Confirmar",
        cancelLabel: options.cancelLabel ?? "Cancelar",
        destructive: options.destructive ?? false,
      });
    });
  }, []);

  const alertSuccess = useCallback((message: string, title = "Listo") => {
    setState({
      open: true,
      mode: "success",
      title,
      description: message,
      confirmLabel: "Entendido",
      cancelLabel: "Cancelar",
      destructive: false,
    });
  }, []);

  const alertError = useCallback((message: string, title = "No se pudo completar") => {
    setState({
      open: true,
      mode: "error",
      title,
      description: message,
      confirmLabel: "Entendido",
      cancelLabel: "Cancelar",
      destructive: false,
    });
  }, []);

  const handleCancel = useCallback(() => {
    if (state.mode === "confirm") {
      confirmResolveRef.current?.(false);
    }
    close();
  }, [state.mode, close]);

  const handleConfirm = useCallback(async () => {
    if (state.mode === "confirm") {
      confirmResolveRef.current?.(true);
      close();
      return;
    }
    close();
  }, [state.mode, close]);

  const value = useMemo(
    () => ({ confirm, alertSuccess, alertError }),
    [confirm, alertSuccess, alertError]
  );

  const isConfirm = state.mode === "confirm";
  const isSuccess = state.mode === "success";
  const isError = state.mode === "error";

  return (
    <AdminActionDialogContext.Provider value={value}>
      {children}
      <Dialog
        open={state.open}
        onOpenChange={(open) => {
          if (!open) handleCancel();
        }}
      >
        <DialogContent className="admin-dialog-surface w-[calc(100%-1.5rem)] max-h-[min(90dvh,28rem)] max-w-md gap-0 overflow-y-auto overflow-x-hidden p-0 sm:max-w-md">
          <DialogHeader className="space-y-3 border-b border-border px-5 pb-4 pt-5 pr-12">
            <div className="flex items-start gap-3">
              {isSuccess ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                </span>
              ) : isError ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-700">
                  <AlertCircle className="h-5 w-5" aria-hidden />
                </span>
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <AlertCircle className="h-5 w-5" aria-hidden />
                </span>
              )}
              <div className="min-w-0 space-y-1.5">
                <DialogTitle>{state.title}</DialogTitle>
                <DialogDescription className="text-pretty leading-relaxed">
                  {state.description}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:justify-end">
            {isConfirm ? (
              <>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  {state.cancelLabel}
                </Button>
                <Button
                  type="button"
                  variant={state.destructive ? "destructive" : "default"}
                  className={cn(!state.destructive && "bg-primary text-primary-foreground")}
                  onClick={() => void handleConfirm()}
                >
                  {state.confirmLabel}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => void handleConfirm()}>
                {state.confirmLabel}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AdminActionDialogContext.Provider>
  );
}
