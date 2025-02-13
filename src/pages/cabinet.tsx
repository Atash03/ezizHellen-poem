import PageLayout from "@/components/layout/page-layout";
import CommentCard from "@/components/shared/comment-card";
import NotificationCard from "@/components/shared/notification-card";
import PoemsItem from "@/components/shared/poems-item";
import Tabs from "@/components/shared/tabs";
import { cn, scrollTop } from "@/lib/utils";
import { useGetPinPoems } from "@/query/use-get-pin-poems";
import { useGetUserComments } from "@/query/use-get-user-comments";
import { useGetUserNotifications } from "@/query/use-get-user-notifications";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

const cabinetTabs = [
  {
    name: "Meniň halanlarym",
    id: 0,
  },
  {
    name: "Meniň teswirlerim",
    id: 1,
  },
  {
    name: "Bildirişler",
    id: 2,
  },
];

const Cabinet = () => {
  const token = useAuthStore((state) => state.accessToken);
  const [active, setActive] = useState(0);
  scrollTop(active);

  const name = useAuthStore((state) => state.name);

  const { data: comments } = useGetUserComments();
  const { data } = useGetPinPoems(token ?? "");
  const { data: notifications } = useGetUserNotifications();

  return (
    <PageLayout title={`Salam ${name}!`} className="gap-12 min-h-[380px]">
      <Tabs
        renderName={(item) => item.name}
        array={Array.isArray(cabinetTabs) ? cabinetTabs : []}
        active={active}
        setActive={setActive}
      />

      <div
        className={cn(
          active === 0
            ? "grid md:grid-cols-2 grid-cols-1 gap-8 xl:w-[948px] mx-auto place-items-center"
            : "flex flex-col items-center gap-6"
        )}
      >
        {active === 0 &&
          data?.pinned_poems.map((item, i) => (
            <PoemsItem
              isNew={item?.new}
              link={`/poems/${item.id}`}
              key={i}
              active
              {...item}
              id={item.id}
            />
          ))}

        {active === 1 &&
          comments?.map((item, i) => <CommentCard key={i} {...item} />)}

        {active === 2 &&
          notifications &&
          notifications.map((item, i) => (
            <NotificationCard
              title={item.title}
              text={item.text}
              date={item.created_at as string}
              key={i}
            />
          ))}
      </div>
    </PageLayout>
  );
};

export default Cabinet;
