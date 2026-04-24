<?php

declare(strict_types=1);

namespace Drupal\ipsosenso_menu\Twig;

use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Expose `ipsosenso_menu(menu_name)` pour rendre un menu Drupal dans une SDC.
 */
final class IpsosensoMenuExtension extends AbstractExtension {

  public function __construct(
    private readonly MenuLinkTreeInterface $menuLinkTree,
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly EntityRepositoryInterface $entityRepository,
  ) {}

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
      $title = (string) $link->getTitle();

      // Pour les menu_link_content, récupérer la traduction de l'entité
      // correspondant à la langue courante (sinon on retombe sur la langue source).
      $meta = $link->getMetaData();
      if (!empty($meta['entity_id'])) {
        $mlc = $this->entityTypeManager->getStorage('menu_link_content')->load($meta['entity_id']);
        if ($mlc) {
          $translated = $this->entityRepository->getTranslationFromContext($mlc);
          $title = (string) $translated->label();
        }
      }

      $items[] = [
        'title' => $title,
        'url' => $link->getUrlObject()->toString(),
        'active' => FALSE,
      ];
    }
    return $items;
  }

}
