import * as z from "zod";

export const postSchema = z.object({
    title: z.string().nonempty('Title ia required'),
    categoryId: z.number().min(1, 'Category ID should not be less than 1'),
    images: z.string().array().nonempty('Images should not be empty'),
    description: z.string().nonempty('Description is required'),
    price: z.number().min(1, 'Price should not be less than 1'),
});

// export const titleSchema = Yup.string().required('Title is required')