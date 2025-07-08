declare module "react-floating-balloons" {
  interface FloatingBalloonsProps {
    count?: number;
    msgText?: string;
    colors?: string[];
    popVolumeLevel?: number;
    loop?: boolean;
    hangOnTop?: boolean;
  }

  const FloatingBalloons: React.FC<FloatingBalloonsProps>;
  export default FloatingBalloons;
}
