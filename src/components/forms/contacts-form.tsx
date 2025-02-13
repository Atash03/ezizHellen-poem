import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import LoadingDots from "../shared/loading-dots";
import { useContactsStore } from "@/store/useContacts";
import { usePopupStore } from "@/store/usePopup";
import { CustomField } from "../shared/custom-field";
import poetService from "@/services/poet.service";
import { useGetStatic } from "@/query/use-get-static-words";

const ContactsForm = () => {
  const setMode = usePopupStore((state) => state.setMode);
  const setSuccess = useContactsStore((state) => state.setSuccess);

  const { data } = useGetStatic(14, "contactsData");

  const formSchema = z.object({
    name: z.string().min(2, "Adyňyz azyndan 2 nyşandan ybarat bolmaly"),
    email: z.string().email("Nädogry"),
    text: z.string().min(5, data?.[11]?.word || ""),
  });

  type FormType = z.infer<typeof formSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      text: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormType) => {
    const body = {
      name: data.name,
      email: data.email,
      text: data.text,
    };

    try {
      await poetService.postContacts(body);

      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h4 className="xl:text-20 text-[18px] xl:mb-6 mb-8">
            {data?.[2]?.word}
          </h4>
          <div className="flex flex-col xl:gap-10 gap-7 md:gap-10 xl:flex-[0_0_648px]">
            <div className="flex md:flex-row flex-col gap-6">
              <CustomField
                control={form.control}
                label={data?.[4]?.word}
                name="name"
                placeholder={data?.[6]?.word}
                error={form.formState.errors.name}
              />
              <CustomField
                control={form.control}
                label={data?.[5]?.word}
                name="email"
                placeholder={data?.[7]?.word}
                error={form.formState.errors.email}
              />
            </div>
            <CustomField
              control={form.control}
              label={data?.[9]?.word}
              name="text"
              placeholder={data?.[8]?.word}
              error={form.formState.errors.text}
              area
            />

            <Button
              onClick={() => setMode("tost")}
              type="submit"
              disabled={isSubmitting}
              className="relative w-full"
            >
              {isSubmitting ? <LoadingDots /> : data?.[10]?.word}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContactsForm;
