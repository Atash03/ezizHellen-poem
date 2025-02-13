import { cn } from '@/lib/utils';
import { BgTexture } from './bg-texture';
import { useRef, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useCommentsStore } from '@/store/useComments';
import { X } from 'lucide-react';
import poetService from '@/services/poet.service';
import { Dialog, DialogContent } from '../ui/dialog';
import { useGetStatic } from '@/query/use-get-static-words';

interface Props {
  active: boolean;
  setActive: (value: boolean) => void;
}

const PopupComment = ({ active, setActive }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const setCommentOpen = useCommentsStore((state) => state.setCommentOpen);
  const setCommentSuccess = useCommentsStore((state) => state.setCommentSuccess);

  const sendComment = async () => {
    try {
      await poetService.postComment({ comment_text: value });
      setCommentSuccess(true);
      setCommentOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useGetStatic(11, 'messagesData');

  return (
    <Dialog open={active} onOpenChange={() => setActive(!active)}>
      <DialogContent
        ref={ref}
        className={cn(
          'md:py-[52px] py-8 w-[328px] h-[532px] md:w-[408px] md:px-6 px-4 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 shadow-bottom',
        )}>
        <BgTexture className="bg-[url('/images/messages/comment-modal-shape.svg')] comment-modal-path" />

        <div className="flex md:bg-none bg-[url('/images/texture047.png')] bg-cover md:size-auto h-screen flex-col gap-6 text-center">
          <X
            onClick={() => setCommentOpen(false)}
            className="absolute md:block hidden top-3 right-3 p-1 cursor-pointer"
            size={30}
          />

          <h5 className="font-semibold">{data?.[6]?.word}</h5>

          <div className="flex flex-col gap-2">
            <div className="text-16 text-left">{data?.[7]?.word}</div>
            <Textarea
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="p-4"
              rows={11}
              maxLength={500}
              minLength={10}
            />
            <div className="flex justify-between items-center">
              <h5 className="text-error">
                {error && 'Siziň teswiriňiz 10 harpdan az bolmaly däl'}
              </h5>
              <div className="text-right text-14 !font-normal justify-end">{value.length}/500</div>
            </div>
          </div>

          <Button
            onClick={() => {
              if (value.length > 10) {
                sendComment();
              } else {
                setError(true);
              }
            }}>
            {data?.[8]?.word}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupComment;
