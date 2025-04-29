import { withAuthBtn } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";
import { GetComponentProps } from "@/lib/types";

interface GetApiKeyBtnProps extends GetComponentProps<typeof Button> {
  userEmail: string | null;
}

const GetApiKeyBtnCore = ({
  children,
  disabled,
  onClick,
}: GetApiKeyBtnProps) => {
  return <Button children={children} disabled={disabled} onClick={onClick} />;
};

export const GetApiKeyBtn = withAuthBtn(GetApiKeyBtnCore);
