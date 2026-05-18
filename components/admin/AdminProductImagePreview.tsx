"use client";

import { useState, type ReactNode } from "react";
import { ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isHttpImageUrl } from "@/lib/admin/image-url";
import { cn } from "@/lib/utils";

type AdminProductImagePreviewProps = {
  src: string;
  alt: string;
  caption?: string;
  children: ReactNode;
  className?: string;
};

/** Miniatura clicable: abre la imagen en un modal (sin preview al hover). */
export function AdminProductImagePreview({
  src,
  alt,
  caption,
  children,
  className,
}: AdminProductImagePreviewProps) {
  const [open, setOpen] = useState(false);

  if (!isHttpImageUrl(src)) {
    return <>{children}</>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Clic para ver la imagen"
        aria-label={`Ver imagen de ${alt}`}
        className={cn(
          "group/preview relative inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
      >
        {children}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-black/0 transition-colors group-hover/preview:bg-black/25"
          aria-hidden
        >
          <ZoomIn className="h-5 w-5 text-white opacity-0 drop-shadow-sm transition-opacity group-hover/preview:opacity-100" />
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(92vw,42rem)] gap-0 overflow-hidden p-0 sm:max-w-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{alt}</DialogTitle>
          </DialogHeader>
          <div className="flex max-h-[min(85vh,640px)] items-center justify-center bg-muted/20 p-4 sm:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src.trim()}
              alt={alt}
              className="max-h-[min(80vh,600px)] w-auto max-w-full object-contain"
            />
          </div>
          {caption ? (
            <p className="border-t border-border px-4 py-3 text-center text-sm text-muted-foreground">
              {caption}
            </p>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
