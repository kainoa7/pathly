import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const Counter = ({ end, duration = 2, prefix = '', suffix = '' }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const SuccessCounter = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const stats = [
    {
      value: 10000,
      label: 'Students Helped',
      icon: '👩‍🎓',
      suffix: '+'
    },
    {
      value: 95,
      label: 'Success Rate',
      icon: '📈',
      suffix: '%'
    },
    {
      value: 150,
      label: 'Average Starting Salary',
      icon: '💰',
      prefix: '$',
      suffix: 'k'
    }
  ];

  return (
    <div ref={containerRef} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-xl blur-xl transition-all duration-300 group-hover:blur-lg" />
              <div className="glass-panel relative p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#EDEAB1] mb-2">
                  <Counter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessCounter; 