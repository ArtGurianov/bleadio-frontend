import { withAuthBtn, WithAuthBtnProps } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";

const GetApiKeyBtnCore = ({
  children,
  disabled,
  onClick,
}: WithAuthBtnProps) => {
  return <Button children={children} disabled={disabled} onClick={onClick} />;
};

export const GetApiKeyBtn = withAuthBtn(GetApiKeyBtnCore);
