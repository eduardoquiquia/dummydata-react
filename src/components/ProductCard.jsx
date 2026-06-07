import { Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { cn } from "../lib/utils";

export function ProductCard({ product, style }) {
  const discount = product.discountPercentage;
  const originalPrice = (product.price / (1 - discount / 100)).toFixed(2);

  return (
    <Card className={cn("flex flex-col group cursor-default")} style={style}>
      <div className="relative overflow-hidden bg-ink aspect-square">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 15 && (
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="gap-1">
              <TrendingUp className="w-3 h-3" />
              -{Math.round(discount)}%
            </Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <Badge variant="secondary" className="mb-2 self-start">
          {product.category}
        </Badge>
        <h3 className="font-display font-semibold text-paper text-base leading-tight line-clamp-2">
          {product.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-mono text-muted">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted ml-1">
            ({product.stock} en stock)
          </span>
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <div>
          <span className="font-display font-bold text-xl text-accent">
            ${product.price.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="ml-2 text-xs text-muted line-through font-mono">
              ${originalPrice}
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-muted uppercase tracking-wider">
          {product.brand || "—"}
        </span>
      </CardFooter>
    </Card>
  );
}
