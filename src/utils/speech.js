export const leggiTesto = (testo, setIsSpeaking) => {
  const synth = window.speechSynthesis;

  if (synth.speaking) {
    synth.cancel();
    setIsSpeaking(false);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(testo);
  utterance.lang = "it-IT";
  synth.speak(utterance);
  setIsSpeaking(true);

  utterance.onend = () => setIsSpeaking(false);
};
