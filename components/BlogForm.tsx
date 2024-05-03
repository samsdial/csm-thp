'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import {
    Editor, editorProps
} from "novel";
import { useCallback, useReducer } from "react";
import { Button } from "./ui/button";

interface ValueFormProps {
    title: string;
    content: string;
    description: string;
}

interface BlogFromProps {
    id: string,
    value: ValueFormProps,
}

export default function BlogForm({ id, value }: BlogFromProps ) {
    const router = useRouter();
    const [blogFrom, setBlogForm] = useReducer((prev: any, next: any) => {
        return {...prev, ...next};
    },{
        title: value?.title || '', 
        content: value?.content || '',
        description: value?.description || '',
    });

    const updateContent = useCallback ((data: editorProps) => {
        setBlogForm({ content: data.getJSON()});
    }, [])

    const onSubmit = async () => {
        let req;
        if(id){
            req = await fetch(`/api/blogs?id=${id}`, {
                method: "PATCH",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(blogFrom)
            });
        } else {
            req = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(blogFrom)
            });
        }
        
        const response = await req.json();

        if(response?.data?.id) {
          router.push("/admin/blogs");
        }
    }
    return (
        <>
            <div>
                <Label htmlFor="title">Titulo</Label>
                <Input
                type="text"
                value={blogFrom.title}
                onChange={(e) => {
                    setBlogForm({ title: e.target.value });
                }}
                className="mt-2"
                />
            </div>
            <div className="mt-5">
                <Label htmlFor="description">Descripción</Label>
                <Input
                type="text"
                value={blogFrom.description}
                onChange={(e) => {
                    setBlogForm({ description: e.target.value });
                }}
                className="mt-2"
                />
            </div>
            <div className="mt-5">
                <Label htmlFor="content">Content</Label>
                <Editor
                editorProps={{}}
                defaultValue={blogFrom.content}
                onDebouncedUpdate={updateContent}
                className="border rounded pb-3 mt-2"
                disableLocalStorage
                />
            </div>
            <div className="flex flex-row-reverse gap-2 mt-4">
                <Button className="mt-4 flex gap-2" onClick={onSubmit}>
                <CheckIcon />
                Guardar
                </Button>
                <Button className="mt-4 flex gap-2" variant={"secondary"}>
                <Cross1Icon />
                Cancelar
                </Button>
            </div>
        </>
    );
}