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
  return (
    <Button disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
};

const GetApiKeyBtn = withAuthBtn(GetApiKeyBtnCore);
GetApiKeyBtn.displayName = "GetApiKeyBtn";

export { GetApiKeyBtn };
