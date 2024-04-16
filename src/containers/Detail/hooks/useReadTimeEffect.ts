import { useEffect, useState } from 'react';

const useReadTimeEffect = () => {

  const readingTime= (text:any) => {
    const averageWPM = 238;

    const adjustedText = text.replace(/(.)\1+/g, '$1');

    const adjustedSentences = adjustedText.replace(/([.!?])\s*\1+/g, '$1');

    const adjustedCharCount = adjustedSentences.length;

    const adjustedWords = adjustedSentences.trim().split(/\s+/);

    const adjustedWordCount = adjustedWords.length;
    
    const averageWordLength = adjustedCharCount / adjustedWordCount;

    const adjustedTime = (adjustedWordCount / averageWPM) * (averageWordLength / 5);

    const formattedAdjustedTime = adjustedTime > 1 ? Math.round(adjustedTime) + " minutos" : "Menos de 1 minuto";

    return formattedAdjustedTime;
  }

  useEffect(() => {
    if (!document) return
    const timeElement = document.getElementById("time");
    const pageElement = document.getElementsByClassName("notion-page")
    if (!pageElement || !timeElement) return
 
    const text = pageElement[0].textContent
    timeElement.innerText = `Tempo estimado de leitura: ${readingTime(text)}`;
   
  }, [])

  return
}

export default useReadTimeEffect
