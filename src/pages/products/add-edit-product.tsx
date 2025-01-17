import {useForm} from "@tanstack/react-form";
import Input from "../../components/Input.tsx";
import Textarea from "../../components/Textarea.tsx";
import usePost from "../../hooks/use-post.tsx";
import {postSchema} from "../../validation/validation-schema.ts";
import {PostType} from "../../types/post.type.ts";
import {useQueryClient} from "@tanstack/react-query";

export default function AddEditProduct({formData}: { formData?: PostType }) {
    const {CreatePost, UpdatePost} = usePost();
    const {mutate: createPost} = CreatePost()
    const {mutate: updatePost} = UpdatePost()
    const queryClient = useQueryClient();
    const form = useForm({
        defaultValues: {
            title: formData?.title || '',
            categoryId: formData?.category.id || 1,
            images: ["https://i.imgur.com/QkIa5tT.jpeg", "https://i.imgur.com/QkIa5tT.jpeg"],
            description: formData?.description || '',
            price: formData?.price || '',
        },
        validators: {
            onChange: postSchema
        },
        onSubmit: async ({value}) => {
            if (formData) {
                updatePost({...value, id: formData.id}, {
                    onSuccess: async () => {
                        queryClient.refetchQueries({queryKey: ["productDetails"]})
                    }, onError: (err) => {
                        console.log(err)
                    }
                })
            } else {
                createPost({...value, userId: 1}, {
                    onSuccess: async () => {
                        queryClient.refetchQueries({queryKey: ["allProducts"]})
                    }, onError: (err) => {
                        console.log(err)
                    }
                })
            }

        },
    })


    return (
        <form className="flex flex-col gap-3" onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit();
        }}>
            <form.Field name={'title'}
                        children={(field) => {
                            return (
                                <Input field={field} label={'Title'} placeholder={'Enter title'}/>
                            )
                        }}
            />
            <form.Field name={'price'}
                        children={(field) => {
                            return (
                                <Input field={field} type={'number'} label={'Price'} placeholder={'Enter price'}/>
                            )
                        }}
            />
            <form.Field name={'description'}
                        children={(field) => {
                            return (
                                <Textarea
                                    label={'Description'}
                                    field={field}
                                    placeholder="Enter description"/>
                            )
                        }}
            />
            <button className="bg-cyan-600 hover:bg-cyan-700 transition text-white p-1 rounded" type={'submit'}>Submit
            </button>
        </form>
    )
}