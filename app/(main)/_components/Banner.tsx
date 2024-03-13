"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
    documentId: Id<"documents">
}

export const Banner= ({
    documentId
}: BannerProps)=>{

    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove=()=>{
        const promise = remove({id: documentId});
        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note Deleted!.",
            error: "Failed to delete the note.",
        });

        router.push("/documents");
    };

    const onRestore=()=>{
        const promise = restore({id: documentId});
        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note Restored!.",
            error: "Failed to restore the note.",
        });
    };

    return(
        <div className="bg-red-500 h-10 flex text-white justify-center items-center gap-x-4">
            <p>This page is currently archived. </p>

            <Button
                size="sm"
                onClick={onRestore}
                className="bg-transparent border-white border-2 hover:bg-white hover:text-red-500"
            >
                Restore Page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    className="bg-transparent border-white border-2 hover:bg-white hover:text-red-500"
                >
                    Delete Forever
                </Button>
            </ConfirmModal>
        </div>
    )
}