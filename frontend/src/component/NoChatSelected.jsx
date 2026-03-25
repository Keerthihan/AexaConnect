import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 items-center justify-center px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#93a4b7]">
          <span className="inline-block size-2 rounded-full bg-[#64d2d6]" />
          Select a conversation
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,_rgba(224,179,109,0.24),_rgba(100,210,214,0.18))] shadow-[0_28px_60px_rgba(0,0,0,0.24)]">
            <div className="absolute inset-3 rounded-[24px] border border-white/10 bg-[rgba(8,17,31,0.45)]" />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[rgba(8,17,31,0.8)]">
              <MessageSquare className="h-8 w-8 text-[#f5efe6]" />
            </div>
          </div>
        </div>

        <h2 className="mt-8 text-4xl font-semibold tracking-tight text-[#f5efe6]">
          Conversations, designed to feel calm.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#93a4b7]">
          Pick someone from the left and start chatting in a cleaner, more focused workspace built for quick replies and long conversations.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
