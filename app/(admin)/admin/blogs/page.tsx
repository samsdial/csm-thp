'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";



export default function BlogsPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useReducer((prev: any, next: any) =>{
        return {...prev, ...next };
    }, {
        data:[],
        loading: false,
    })
    

    const fetchBlogs = async () => {
        setResponse({ loading: true });
        const res = await fetch("/api/blogs", {
            method: "GET",
        });
        const response = await res.json()
        
        setResponse({
            data: response.data,
            loading: false,
        })
    }
    const deleteBlog = async (id: string) => {
        setLoading(true);
        const res = await fetch("/api/blogs", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const response = await res.json()
        if(response?.status === 204){
            // router.push('/admin/blogs');
            fetchBlogs();
        }
        setLoading(false);
    }

    useEffect(()=> {
        setResponse({
          loading: true,
        });
        fetchBlogs()
    }, [])

    

    return (
      <>
        <div className="flex mb-5">
          <div className="d">
            <h2 className="text-2xl font-bold">Blogs</h2>
          </div>
          <div></div>
        </div>

        {response.loading ? (
          <div className="animate-pulse grid grid-row gap-4">
            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
        ) : (
          <>
            {response.data.length > 0 ? (
              <>
                {response.data.map(
                  (d: { title: string; id: string; description: string }) => (
                    <div key={d.id} className="mb-4 flex justify-between group">
                      <div className="f">
                        <Link
                          className="text-xl font-semibold text-blue-600"
                          href={`/admin/blogs/${d.id}`}
                        >
                          {d.title}
                        </Link>
                        <p className="text-sm text-gray-500 font-extralight">
                          {d?.description
                            ? d?.description
                            : "No hay descripción"}
                        </p>
                      </div>
                      <div className="f">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant={"secondary"}
                                    className="opacity-0 transition ease-in-out delay-150 group-hover:opacity-100"
                                >
                                    <TrashIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Confimar la eliminación?</DialogTitle>
                                    <DialogDescription>
                                        Asegúrese de que desea eliminar <b>{d.title}</b>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="mt-5">
                                    <DialogClose asChild>
                                        <Button variant={"secondary"}>Cancelar</Button>
                                    </DialogClose>
                                    <Button disabled={loading} onClick={() => deleteBlog(d.id)} variant={"destructive"}>
                                        {loading ?(<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />):("Eliminar")}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  )
                )}
              </>
            ) : (
              <h1>no data</h1>
            )}
          </>
        )}
      </>
    );
}