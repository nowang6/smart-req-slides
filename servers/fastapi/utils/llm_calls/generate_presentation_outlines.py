from datetime import datetime
from typing import Optional

from models.llm_message import LLMSystemMessage, LLMUserMessage
from models.llm_tools import SearchWebTool
from services.llm_client import LLMClient
from utils.get_dynamic_models import get_presentation_outline_model_with_n_slides
from utils.llm_client_error_handler import handle_llm_client_exceptions
from utils.llm_provider import get_model


def get_system_prompt(
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    include_title_slide: bool = True,
):
    return f"""
    你是一名专业的演示文稿创建专家。根据用户需求生成结构化演示文稿，并按照指定的 JSON 模板格式化内容，使用 Markdown 编写。
    尝试使用可用工具以获得更好的效果。

    指南：
    - 为每一张幻灯片提供 Markdown 格式的内容。
    - 确保演示文稿的逻辑和内容连贯。
    - 更加注重数值数据的呈现。
    - 如果提供了“附加信息”，请将其分割到多张幻灯片中。
    - 内容中不要包含任何图片。
    - 确保内容遵循语言规范。
    - 用户指令应始终被遵循，并优先于其他指令，**但幻灯片编号除外。请不要遵循用户指示中的幻灯片编号。**
    - 不生成目录幻灯片。
    - 即使提供了目录，也不要生成目录幻灯片。
    - 第一张幻灯片必须为标题幻灯片。
    """


def get_user_prompt(
    content: str,
    n_slides: int,
    language: str,
    additional_context: Optional[str] = None,
):
    return f"""
        **输入:**
        - 用户提供的内容: {content or "Create presentation"}
        - 幻灯片数量: {n_slides}
        - 当前日期和时间: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        - 附加信息: {additional_context or ""}
    """


def get_messages(
    content: str,
    n_slides: int,
    language: str,
    additional_context: Optional[str] = None,
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    include_title_slide: bool = True,
):
    return [
        LLMSystemMessage(
            content=get_system_prompt(
                tone, verbosity, instructions, include_title_slide
            ),
        ),
        LLMUserMessage(
            content=get_user_prompt(content, n_slides, language, additional_context),
        ),
    ]


async def generate_ppt_outline(
    content: str,
    n_slides: int,
    language: Optional[str] = None,
    additional_context: Optional[str] = None,
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    include_title_slide: bool = True,
    web_search: bool = False,
):
    model = get_model()
    response_model = get_presentation_outline_model_with_n_slides(n_slides)

    client = LLMClient()

    try:
        async for chunk in client.stream_structured(
            model,
            get_messages(
                content,
                n_slides,
                language,
                additional_context,
                tone,
                verbosity,
                instructions,
                include_title_slide,
            ),
            response_model.model_json_schema(),
            strict=True,
            tools=(
                [SearchWebTool]
                if (client.enable_web_grounding() and web_search)
                else None
            ),
        ):
            yield chunk
    except Exception as e:
        yield handle_llm_client_exceptions(e)
