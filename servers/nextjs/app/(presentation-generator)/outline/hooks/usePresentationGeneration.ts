import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clearPresentationData } from "@/store/slices/presentationGeneration";
import { PresentationGenerationApi } from "../../services/api/presentation-generation";
import { LayoutGroup, LoadingState, TABS } from "../types/index";
import { MixpanelEvent, trackEvent } from "@/utils/mixpanel";

const DEFAULT_LOADING_STATE: LoadingState = {
  message: "",
  isLoading: false,
  showProgress: false,
  duration: 0,
};

export const usePresentationGeneration = (
  presentationId: string | null,
  outlines: { content: string }[] | null,
  selectedLayoutGroup: LayoutGroup | null,
  setActiveTab: (tab: string) => void
) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loadingState, setLoadingState] = useState<LoadingState>(DEFAULT_LOADING_STATE);

  const validateInputs = useCallback(() => {
    if (!outlines || outlines.length === 0) {
      toast.error("无大纲", {
        description: "请等待大纲加载完成后再生成演示文稿",
      });
      return false;
    }

    if (!selectedLayoutGroup) {
      toast.error("选择布局组", {
        description: "请在生成演示文稿前选择一个布局组",
      });
      return false;
    }
    if (!selectedLayoutGroup.slides.length) {
      toast.error("未找到幻灯片架构", {
        description: "请在生成演示文稿前选择一个组",
      });
      return false;
    }

    return true;
  }, [outlines, selectedLayoutGroup]);

  const prepareLayoutData = useCallback(() => {
    if (!selectedLayoutGroup) return null;
    return {
      name: selectedLayoutGroup.name,
      ordered: selectedLayoutGroup.ordered,
      slides: selectedLayoutGroup.slides
    };
  }, [selectedLayoutGroup]);

  const handleSubmit = useCallback(async () => {
    if (!selectedLayoutGroup) {
      setActiveTab(TABS.LAYOUTS);
      return;
    }
    if (!validateInputs()) return;



    setLoadingState({
      message: "正在生成演示文稿数据...",
      isLoading: true,
      showProgress: true,
      duration: 30,
    });

    try {
      const layoutData = prepareLayoutData();

      if (!layoutData) return;
      trackEvent(MixpanelEvent.Presentation_Prepare_API_Call);
      const response = await PresentationGenerationApi.presentationPrepare({
        presentation_id: presentationId,
        outlines: outlines,
        layout: layoutData,
      });

      if (response) {
        dispatch(clearPresentationData());
        router.replace(`/presentation?id=${presentationId}&stream=true`);
      }
    } catch (error: any) {
      console.error('Error In Presentation Generation(prepare).', error);
      toast.error("生成错误", {
        description: error.message || "演示文稿生成过程中出错(prepare).",
      });
    } finally {
      setLoadingState(DEFAULT_LOADING_STATE);
    }
  }, [validateInputs, prepareLayoutData, presentationId, outlines, dispatch, router]);

  return { loadingState, handleSubmit };
}; 