import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { User } from "@/types";
import { useEffect } from "react";
import { Restaurant } from "@/types";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
const formSchema = z.object({
    restaurantName: z.string({ required_error: "Restaurant name is required" }),
    city: z.string({ required_error: "City is required" }),
    country: z.string({ required_error: "Country is required" }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item",
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number().min(1, "price is required"),
        })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: RestaurantFormData) => void;
    isLoading?: boolean;
}

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });
    const onSubmit = (data: RestaurantFormData) => {
        console.log("123")
        console.log(data);
    }
    const handleClick = () => {
        console.log(form.getValues());
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                <Separator />
                {isLoading ? <LoadingButton /> : <Button type="submit" onClick={handleClick}>Submit</Button>}
            </form>
        </Form>
    );
}

export default ManageRestaurantForm;