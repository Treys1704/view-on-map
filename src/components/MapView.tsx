import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map } from "./Map";
import { X, MapIcon } from "lucide-react";

export default function MapView() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const EIFFEL_TOWER: [number, number] = [48.8584, 2.2945];

  const expandedSize = {
    width: "calc(30vw - 60px)",
    height: "calc(40vh - 40px)",
  };

  const collapsedSize = {
    width: "170px",
    height: "48px",
  };

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setShowMap(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowMap(false);
    }
  }, [isExpanded]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key="map-container"
          initial={collapsedSize}
          animate={isExpanded ? expandedSize : collapsedSize}
          exit={collapsedSize}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 20,
          }}
          className="bg-white shadow-lg overflow-hidden flex items-center justify-center relative"
          style={{
            borderRadius: isExpanded ? "12px" : "24px",
          }}
        >
          {isExpanded ? (
            <>
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Close map"
              >
                <X className="w-4 h-4" />
              </button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full h-full z-0"
              >
                {showMap && <Map center={EIFFEL_TOWER} zoom={15} />}
              </motion.div>
            </>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 w-full h-full bg-white rounded-full hover:bg-gray-50 transition-colors"
            >
              <MapIcon className="w-4 h-4" />
              <span>View on Map</span>
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
