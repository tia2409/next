import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useFormData = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const previousPath = useRef(currentPath); // 이전 경로를 저장할 ref

  // 모든 input과 select 값을 저장하는 함수
  const saveAllData = () => {
    const inputs = document.querySelectorAll("input");
    const allData = {};

    inputs.forEach((input) => {
      const idOrName = input.id || input.name;

      // 체크박스일 경우 checked 상태 저장, 그렇지 않으면 value 저장
      if (input.type === "checkbox") {
        allData[idOrName] = input.checked;
      } else {
        allData[idOrName] = input.value; // value 가져오기
      }
    });
    sessionStorage.setItem(currentPath, JSON.stringify(allData));
  };

  // 페이지가 로드될 때 저장된 데이터를 복원하는 함수
  const restoreAllData = () => {
    const savedData = JSON.parse(sessionStorage.getItem(previousPath.current));

    if (savedData) {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        const idOrName = input.id || input.name;

        // 체크박스일 경우 checked 상태 복원, 그렇지 않으면 value 복원
        if (savedData[idOrName] !== undefined) {
          console.log(idOrName, savedData[idOrName], input.type);
          if (input.type === "checkbox") {
            input.checked = savedData[idOrName];
          } else {
            input.value = savedData[idOrName]; // value 설정하기
          }
        }
      });
    }
  };

  useEffect(() => {
    // 페이지가 다시 로드되거나 bfcache에서 복원될 때 저장된 상태 복원
    const handlePageShow = (event) => {
      if (event.persisted) {
        restoreAllData();
      }
    };

    // 저장된 데이터 복원
    restoreAllData();

    // beforeRouteChange 이벤트로 페이지를 떠날 때 데이터 저장
    const handleRouteChange = (url) => {
      // 경로가 변경될 때만 데이터 저장
      if (previousPath.current == currentPath) {
        saveAllData(); // 페이지 변경 전 데이터 저장
        previousPath.current = currentPath; // 현재 경로 업데이트
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [currentPath]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      //페이지 이동 감지
    };

    const handleBeforeUnload = (event) => {
      // 여기에서 새로 고침 감지
      sessionStorage.clear();
    };

    router.events.on("routeChangeStart", handleRouteChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router.events]);

  return { restoreAllData };
};

export default useFormData;
