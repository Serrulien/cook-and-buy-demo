import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.path === 'list';
  }

  public store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    this.storedRoutes.set(route.routeConfig!.path!, handle!);
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return (
      !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig!.path!)
    );
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(route.routeConfig!.path!) ?? null;
  }

  public shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
