import { BgTexture } from './bg-texture';

interface Props {
  comment_text: string;
  id?: number;
}

const CommentCard = ({ comment_text }: Props) => {
  return (
    <div className="xl:py-8 pb-[52px] p-4 xl:px-6 relative shadow-bottom xl:w-[892px] xl:h-[236px] md:h-[233px] md:w-[768px] h-[396px] w-[328px]">
      <BgTexture className=" xl:bg-[url('/images/messages/1-shape.svg')] md:bg-[url('/images/messages/message-med-shape.svg')] bg-[url('/images/messages/message-mob-shape.svg')] xl:message-1-path md:message-med-path message-mob-path" />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h5 className="text-[14px] text-ON_SURFACE_VAR font-medium leading-[145%]">
            {'example'}
          </h5>
          <div className="text-ON_SURFACE_VAR_LOW text-[12px] font-medium leading-[130%]">
            {'10.10.2129'}
          </div>
        </div>

        <p className="text-16 !font-normal">{comment_text}</p>
      </div>
    </div>
  );
};

export default CommentCard;
