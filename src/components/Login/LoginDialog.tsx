"use client";

import { DialogDrawer } from "@/components/common/DialogDrawer/DialogDrawer";
import { FormStatus, GetComponentProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailSchema } from "@/lib/schemas/emailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/actions/login";

export const GuardedLoginBtn = (props: GetComponentProps<typeof Button>) => {
  const [formStatus, setFormStatus] = useState<FormStatus>("PENDING");

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = ({ email }: { email: string }) => {
    login(email);
  };

  return (
    <DialogDrawer
      title={"Please login to continue."}
      trigger={<Button {...props}>{"Login"}</Button>}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col sm:flex-row gap-4 self-stretch justify-center items-center mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grow self-stretch">
                <FormControl>
                  <Input
                    {...field}
                    disabled={formStatus === "LOADING"}
                    placeholder={"Enter your email"}
                    onChange={(ev) => {
                      setFormStatus("PENDING");
                      form.clearErrors();
                      field.onChange(ev);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-center text-danger" />
              </FormItem>
            )}
          />
          <div className="flex self-stretch justify-center">
            {formStatus === "SUCCESS" ? (
              <span className="text-2xl text-center text-primary">
                {"Email sent!"}
              </span>
            ) : (
              <Button
                type="submit"
                disabled={
                  formStatus === "LOADING" ||
                  !!Object.keys(form.formState.errors).length
                }
              >
                {formStatus === "LOADING" ? "Loading..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </DialogDrawer>
  );
};
