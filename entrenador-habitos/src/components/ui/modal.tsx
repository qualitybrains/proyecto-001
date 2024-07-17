import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

export function ModalHeader ({
    title,
    onOpenChange,
}: {
    title: string,
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
        </>
    )
}

export function Modal({
    title,
    buttonName,
    open,
    onOpenChange,
    className,
    children,
    trigger,
}: {
    title?: string,
    buttonName: string,
    open: boolean,
    onOpenChange: (open: boolean) => void;
    className?: string,
    children: React.ReactNode;
    trigger?: boolean
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            {trigger && <DialogTrigger asChild><Button>{buttonName}</Button></DialogTrigger>}
            <DialogContent
                className={cn(className)}>
                    {title}
                    {children}
                </DialogContent>
        </Dialog>
    )
}