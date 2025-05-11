import { EmailMessageType } from "@/lib/types";
import { EMAIL_MESSAGE_TYPES } from "@/lib/utils/contsants";

export const EmailTemplateData: Record<
  EmailMessageType,
  { subject: string; title: string; description: string }
> = {
  [EMAIL_MESSAGE_TYPES.LIMIT_REACHED_FREE]: {
    subject: "Messages limit reached",
    title: "Blead.io - Your LITE plan limit is reached.",
    description:
      "Your LITE plan limit is reached. Please consider an upgrade to a PRO plan to increase your limits.",
  },
  [EMAIL_MESSAGE_TYPES.LIMIT_REACHED_PRO]: {
    subject: "Messages limit reached",
    title: "Blead.io - Your PRO plan limit is reached.",
    description:
      "Your PRO plan limit is reached. We don't provide any higher plan just because it creates too much distraction to read more notifications on telegram within one month. We recommend you to adjust your business logic to only receive the most important information that requires your immediate reaction. Feel free to contact us if you'd like to discuss it.",
  },
  [EMAIL_MESSAGE_TYPES.SUBSCRIPTION_EXPIRED]: {
    subject: "Subscription expired",
    title: "Your PRO plan subscription is expired",
    description:
      "Your PRO plan subscription is expired. You're now back on the LITE plan. Consider upgrading if you still expect getting lots of notification for the next month.",
  },
  [EMAIL_MESSAGE_TYPES.SUBSCRIPTION_UPGRADED]: {
    subject: "Subscription successfully upgraded",
    title: "Enjoy PRO! Plan upgraded!",
    description:
      "It is time to enjoy highest limit of notifications number for the next billing period!",
  },
};
