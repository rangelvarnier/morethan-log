import { useEffect } from "react"
import mermaid from "mermaid"

const useMermaidEffect = () => {
  useEffect(() => {
    const renderMermaid = async () => {
      mermaid.initialize({
        startOnLoad: true,
      });
      const elements: HTMLCollectionOf<Element> =
        document.getElementsByClassName("language-mermaid");

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent) {
          try {
            const { svg } = await mermaid.render(
              "mermaid" + i,
              elements[i].textContent
            );
            elements[i].innerHTML = svg;
          } catch (error) {
            console.error("Mermaid render error:", error);
          }
        }
      }
    };
    renderMermaid();
  }, []);

  return;
};

export default useMermaidEffect;