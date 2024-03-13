import { useTheme } from "next-themes";
import { Block } from "@blocknote/core";
import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteView,
  useCreateBlockNote,
} from "@blocknote/react";

import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({
  onChange,
  initialContent,
  editable,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ 
      file
    });

    return response.url;
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent) as PartialBlock[] 
      : undefined,
    uploadFile: handleUpload
    })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange = {() => {
          console.log(blocks);
          onChange(JSON.stringify(blocks, null, 2))
          setBlocks(editor.document);
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}

export default Editor;