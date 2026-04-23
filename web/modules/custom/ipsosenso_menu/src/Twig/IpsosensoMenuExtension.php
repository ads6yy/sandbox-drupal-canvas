<?php

declare(strict_types=1);

namespace Drupal\ipsosenso_menu\Twig;

use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Expose `ipsosenso_menu(menu_name)` pour rendre un menu Drupal dans une SDC.
 */
final class IpsosensoMenuExtension extends AbstractExtension {

  public function __construct(private readonly MenuLinkTreeInterface $menuLinkTree) {}

  public function getFunctions(): array {
    return [
      new TwigFunction(
        'ipsosenso_menu',
        [$this, 'renderMenu'],
        ['is_safe' => ['html']],
      ),
    ];
  }

  /**
   * Retourne un tableau plat de liens pour un menu donné.
   *
   * @return array<int, array{title: string, url: string, active: bool}>
   */
  public function renderMenu(string $menu_name): array {
    $params = (new MenuTreeParameters())
      ->setMinDepth(1)
      ->setMaxDepth(1)
      ->onlyEnabledLinks();

    $tree = $this->menuLinkTree->load($menu_name, $params);
    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $this->menuLinkTree->transform($tree, $manipulators);

    $items = [];
    foreach ($tree as $element) {
      if (!$element->access || !$element->access->isAllowed()) {
        continue;
      }
      $link = $element->link;
      $items[] = [
        'title' => (string) $link->getTitle(),
        'url' => $link->getUrlObject()->toString(),
        'active' => FALSE,
      ];
    }
    return $items;
  }

}
