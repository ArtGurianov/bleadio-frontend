import { withAuthBtn, WithAuthBtnProps } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";

interface GetApiKeyBtnProps extends WithAuthBtnProps {
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
